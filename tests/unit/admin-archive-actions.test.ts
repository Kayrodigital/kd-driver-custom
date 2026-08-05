import { beforeEach, describe, expect, it, vi } from "vitest";

const selectMock = vi.fn();
const updateMock = vi.fn();
const redirectMock = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
}));

vi.mock("@/infrastructure/supabase/admin-client", () => ({
  createAdminClient: () => ({
    from: () => ({
      select: selectMock,
      update: updateMock,
    }),
  }),
}));

const { archiveReservation, archiveReservations, restoreReservation, restoreReservations } = await import("@/app/admin/actions");

function mockGuardRow(row: { archived_at: string | null; history: unknown[] | null }) {
  selectMock.mockReturnValue({ eq: () => ({ maybeSingle: async () => ({ data: row, error: null }) }) });
}

function mockUpdateChain() {
  const eqSpy = vi.fn().mockReturnThis();
  const isSpy = vi.fn().mockResolvedValue({ error: null });
  const notSpy = vi.fn().mockResolvedValue({ error: null });
  updateMock.mockReturnValue({ eq: eqSpy, is: isSpy, not: notSpy });
  return { eqSpy, isSpy, notSpy };
}

beforeEach(() => {
  selectMock.mockReset();
  updateMock.mockReset();
  redirectMock.mockReset();
});

describe("archiveReservation", () => {
  it("archive une réservation non archivée : archived_at posé, historique journalisé", async () => {
    mockGuardRow({ archived_at: null, history: [] });
    mockUpdateChain();
    await archiveReservation("res-1");
    expect(updateMock).toHaveBeenCalledTimes(1);
    const payload = updateMock.mock.calls[0][0];
    expect(payload.archived_at).not.toBeNull();
    expect(payload.history).toHaveLength(1);
    expect(payload.history[0].action).toBe("reservation_archived");
    expect(redirectMock).toHaveBeenCalledWith("/admin");
  });

  it("ne fait rien si déjà archivée (idempotent)", async () => {
    mockGuardRow({ archived_at: "2026-08-01T00:00:00.000Z", history: [] });
    await archiveReservation("res-1");
    expect(updateMock).not.toHaveBeenCalled();
  });
});

describe("restoreReservation", () => {
  it("restaure une réservation archivée : archived_at et archived_by remis à null", async () => {
    mockGuardRow({ archived_at: "2026-08-01T00:00:00.000Z", history: [] });
    mockUpdateChain();
    await restoreReservation("res-1");
    const payload = updateMock.mock.calls[0][0];
    expect(payload.archived_at).toBeNull();
    expect(payload.archived_by).toBeNull();
    expect(payload.history[0].action).toBe("reservation_restored");
  });

  it("ne fait rien si pas archivée", async () => {
    mockGuardRow({ archived_at: null, history: [] });
    await restoreReservation("res-1");
    expect(updateMock).not.toHaveBeenCalled();
  });
});

describe("archiveReservations (groupé)", () => {
  it("archive chaque id fourni indépendamment", async () => {
    mockGuardRow({ archived_at: null, history: [] });
    mockUpdateChain();
    const formData = new FormData();
    formData.append("ids", "res-1");
    formData.append("ids", "res-2");
    await archiveReservations(formData);
    expect(updateMock).toHaveBeenCalledTimes(2);
    expect(redirectMock).toHaveBeenCalledWith("/admin");
  });
});

describe("restoreReservations (groupé)", () => {
  it("restaure chaque id fourni indépendamment", async () => {
    mockGuardRow({ archived_at: "2026-08-01T00:00:00.000Z", history: [] });
    mockUpdateChain();
    const formData = new FormData();
    formData.append("ids", "res-1");
    formData.append("ids", "res-2");
    await restoreReservations(formData);
    expect(updateMock).toHaveBeenCalledTimes(2);
  });
});
