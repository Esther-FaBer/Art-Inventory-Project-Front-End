type Props = {
  value: string;
  label: string;
  icon?: string;
};

const StatCard = ({ value, label, icon }: Props) => {
  return (
    <div className="stat-card">
      {icon && <span className="stat-card-icon">{icon}</span>}
      <p className="stat-card-value">{value}</p>
      <p className="stat-card-label">{label}</p>
    </div>
  );
};

export default StatCard;