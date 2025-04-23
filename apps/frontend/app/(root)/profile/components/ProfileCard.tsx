const ProfileCard = ({
  title,
  children,
  className = '',
  accentColor = '',
  icon,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  icon?: React.ReactNode;
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
  >
    {title && (
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-500">{icon}</span>}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {accentColor && (
          <div className={`w-2 h-2 rounded-full ${accentColor}`} />
        )}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

export default ProfileCard;
