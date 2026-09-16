export function Card({ children, tone = 'default', className = '' }) {
  return <div className={`card card-${tone} ${className}`}>{children}</div>;
}

export function ScreenShell({ eyebrow, title, subtitle, children }) {
  return (
    <div className="screen">
      <div className="screen-head">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      <div className="screen-body">{children}</div>
    </div>
  );
}

export function EmptyState({ icon = '🍱', title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
