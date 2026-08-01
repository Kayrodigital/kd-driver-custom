import { userStories } from "./user-stories-data";

export function UserStoriesSection() {
  return (
    <section id="user-stories" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">User stories</p>
          <h2 className="wf-h2">23 user stories et critères d’acceptation</h2>
          <p className="wf-lead">Couvrent le parcours client (1 à 18) et le workflow propriétaire (19 à 23).</p>
        </div>
        <div>
          {userStories.map((story, index) => (
            <div className="wf-story" key={story.goal}>
              <p className="wf-story-title"><span className="wf-story-num">#{index + 1}</span>En tant que {story.role}, je veux {story.goal}, afin de {story.benefit}.</p>
              <p className="wf-story-ac">Critères d’acceptation</p>
              <ul>
                {story.criteria.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
