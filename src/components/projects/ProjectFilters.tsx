import { ProjectType, ProjectRole, ProjectStatus } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  activeTypes: ProjectType[];
  activeRoles: ProjectRole[];
  activeStatuses: ProjectStatus[];
  onTypeChange: (types: ProjectType[]) => void;
  onRoleChange: (roles: ProjectRole[]) => void;
  onStatusChange: (statuses: ProjectStatus[]) => void;
}

const typeOptions: { value: ProjectType; label: string }[] = [
  { value: 'residential', label: 'Residencial' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'institutional', label: 'Institucional' },
  { value: 'industrial', label: 'Industrial' },
];

const roleOptions: { value: ProjectRole; label: string }[] = [
  { value: 'design', label: 'Diseño' },
  { value: 'execution', label: 'Ejecución' },
  { value: 'design-execution', label: 'Diseño + Ejecución' },
];

const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: 'completed', label: 'Terminado' },
  { value: 'in-progress', label: 'En obra' },
];

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-caption rounded-full transition-all duration-200 focus-ring',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}

export function ProjectFilters({
  activeTypes,
  activeRoles,
  activeStatuses,
  onTypeChange,
  onRoleChange,
  onStatusChange,
}: ProjectFiltersProps) {
  const toggleType = (type: ProjectType) => {
    if (activeTypes.includes(type)) {
      onTypeChange(activeTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...activeTypes, type]);
    }
  };

  const toggleRole = (role: ProjectRole) => {
    if (activeRoles.includes(role)) {
      onRoleChange(activeRoles.filter((r) => r !== role));
    } else {
      onRoleChange([...activeRoles, role]);
    }
  };

  const toggleStatus = (status: ProjectStatus) => {
    if (activeStatuses.includes(status)) {
      onStatusChange(activeStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...activeStatuses, status]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Type filters */}
      <div>
        <span className="text-micro font-medium text-muted-foreground uppercase tracking-wide mr-4">
          Tipología
        </span>
        <div className="inline-flex flex-wrap gap-2 mt-2">
          {typeOptions.map((option) => (
            <FilterButton
              key={option.value}
              active={activeTypes.includes(option.value)}
              onClick={() => toggleType(option.value)}
            >
              {option.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Role filters */}
      <div>
        <span className="text-micro font-medium text-muted-foreground uppercase tracking-wide mr-4">
          Rol
        </span>
        <div className="inline-flex flex-wrap gap-2 mt-2">
          {roleOptions.map((option) => (
            <FilterButton
              key={option.value}
              active={activeRoles.includes(option.value)}
              onClick={() => toggleRole(option.value)}
            >
              {option.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Status filters */}
      <div>
        <span className="text-micro font-medium text-muted-foreground uppercase tracking-wide mr-4">
          Estado
        </span>
        <div className="inline-flex flex-wrap gap-2 mt-2">
          {statusOptions.map((option) => (
            <FilterButton
              key={option.value}
              active={activeStatuses.includes(option.value)}
              onClick={() => toggleStatus(option.value)}
            >
              {option.label}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );
}
