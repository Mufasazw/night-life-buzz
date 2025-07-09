
interface VibeMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const VibeMeter = ({ score, size = 'md' }: VibeMeterProps) => {
  const percentage = Math.min(Math.max(score, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1.5 w-16',
    md: 'h-2 w-20',
    lg: 'h-3 w-24'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getVibeLabel = (score: number) => {
    if (score >= 90) return 'INSANE 🔥';
    if (score >= 80) return 'LIT 🚀';
    if (score >= 70) return 'BUZZING ⚡';
    if (score >= 60) return 'DECENT 👌';
    if (score >= 40) return 'WARMING UP 📈';
    return 'QUIET 😴';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
        <div 
          className="h-full vibe-meter transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`${textSizes[size]} font-medium text-foreground`}>
        {getVibeLabel(score)}
      </span>
    </div>
  );
};

export default VibeMeter;
