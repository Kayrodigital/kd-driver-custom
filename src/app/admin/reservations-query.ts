/**
 * Moteur de requête de la liste admin. La liste chargeait auparavant 300
 * lignes en une fois et filtrait en mémoire côté Next.js (aucun filtre ne
 * touchait Supabase) — impossible de construire des vues, un tri ou une
 * pagination cohérents sur cette base. `buildReservationsQueryParams` est
 * la partie pure et testable (normalisation des paramètres d'URL) ;
 * `applyReservationsQuery` traduit ce descripteur en appels Supabase réels
 * (non testée unitairement, simple traduction mécanique).
 */

export const RESERVATION_VIEWS = ["todo", "upcoming", "archives", "all"] as const;
export type ReservationView = (typeof RESERVATION_VIEWS)[number];

export const SORT_OPTIONS = [
  "created_desc",
  "created_asc",
  "pickup_asc",
  "pickup_desc",
  "price_asc",
  "price_desc",
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const PAGE_SIZES = [25, 50, 100] as const;
export type PageSize = (typeof PAGE_SIZES)[number];

export type ReservationsQueryParams = {
  view: ReservationView;
  search: string;
  status: string;
  createdFrom: string;
  createdTo: string;
  courseFrom: string;
  courseTo: string;
  sort: SortOption;
  page: number;
  pageSize: PageSize;
  includeArchived: boolean;
};

const DEFAULT_SORT_BY_VIEW: Record<ReservationView, SortOption> = {
  todo: "created_asc",
  upcoming: "pickup_asc",
  archives: "pickup_desc",
  all: "created_desc",
};

const TODO_STATUSES = ["new", "quote_requested", "contacted"];

function isView(value: string): value is ReservationView {
  return (RESERVATION_VIEWS as readonly string[]).includes(value);
}

function isSortOption(value: string): value is SortOption {
  return (SORT_OPTIONS as readonly string[]).includes(value);
}

function isPageSize(value: number): value is PageSize {
  return (PAGE_SIZES as readonly number[]).includes(value);
}

function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function buildReservationsQueryParams(searchParams: Record<string, string | undefined>): ReservationsQueryParams {
  const view = isView(searchParams.view ?? "") ? (searchParams.view as ReservationView) : "todo";
  const requestedSort = searchParams.sort ?? "";
  const sort = isSortOption(requestedSort) ? (requestedSort as SortOption) : DEFAULT_SORT_BY_VIEW[view];
  const requestedPageSize = Number(searchParams.pageSize ?? "25");
  const pageSize = isPageSize(requestedPageSize) ? requestedPageSize : 25;
  const requestedPage = Number(searchParams.page ?? "1");
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  return {
    view,
    search: (searchParams.q ?? "").trim(),
    status: searchParams.status ?? "",
    createdFrom: isValidDateString(searchParams.createdFrom ?? "") ? (searchParams.createdFrom as string) : "",
    createdTo: isValidDateString(searchParams.createdTo ?? "") ? (searchParams.createdTo as string) : "",
    courseFrom: isValidDateString(searchParams.courseFrom ?? "") ? (searchParams.courseFrom as string) : "",
    courseTo: isValidDateString(searchParams.courseTo ?? "") ? (searchParams.courseTo as string) : "",
    sort,
    page,
    pageSize,
    includeArchived: searchParams.includeArchived === "1",
  };
}

const SORT_COLUMNS: Record<SortOption, { column: string; ascending: boolean }> = {
  created_desc: { column: "created_at", ascending: false },
  created_asc: { column: "created_at", ascending: true },
  pickup_asc: { column: "pickup_at", ascending: true },
  pickup_desc: { column: "pickup_at", ascending: false },
  price_asc: { column: "confirmed_price_cents", ascending: true },
  price_desc: { column: "confirmed_price_cents", ascending: false },
};

export const RESERVATIONS_SELECT =
  "id,public_reference,created_at,pickup_at,status,pricing_status,estimated_price_cents,confirmed_price_cents,pricing_mode,pickup_address,destination_address,archived_at,notes,passengers,luggage,assigned_driver_name,customers(first_name,last_name,phone,email),vehicles(label)";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyReservationsQuery(supabase: any, params: ReservationsQueryParams, options: { paginate?: boolean } = {}) {
  const paginate = options.paginate ?? true;
  let query = supabase.from("reservations").select(RESERVATIONS_SELECT, { count: "exact" });

  if (params.view === "todo") {
    query = query.is("archived_at", null).in("status", TODO_STATUSES);
  } else if (params.view === "upcoming") {
    query = query.is("archived_at", null).eq("status", "confirmed").gte("pickup_at", new Date().toISOString());
  } else if (params.view === "archives") {
    query = query.not("archived_at", "is", null);
  } else if (params.view === "all" && !params.includeArchived) {
    query = query.is("archived_at", null);
  }

  if (params.status) query = query.eq("status", params.status);
  if (params.search) {
    const like = `%${params.search}%`;
    query = query.or(
      `public_reference.ilike.${like},customers.phone.ilike.${like},customers.first_name.ilike.${like},customers.last_name.ilike.${like}`,
    );
  }
  if (params.createdFrom) query = query.gte("created_at", `${params.createdFrom}T00:00:00`);
  if (params.createdTo) query = query.lte("created_at", `${params.createdTo}T23:59:59`);
  if (params.courseFrom) query = query.gte("pickup_at", `${params.courseFrom}T00:00:00`);
  if (params.courseTo) query = query.lte("pickup_at", `${params.courseTo}T23:59:59`);

  const { column, ascending } = SORT_COLUMNS[params.sort];
  query = query.order(column, { ascending, nullsFirst: false });

  if (paginate) {
    const from = (params.page - 1) * params.pageSize;
    const to = from + params.pageSize - 1;
    query = query.range(from, to);
  }

  return query;
}
