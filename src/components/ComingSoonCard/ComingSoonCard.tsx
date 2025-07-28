import { useEffect, useRef } from 'react';
import { Hourglass } from 'lucide-react';
import './ComingSoonCard.css';

interface ComingSoonCardProps {
  team: string;
  onClose: () => void;
}

export default function ComingSoonCard({ team, onClose }: ComingSoonCardProps) {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !(cardRef.current as any).contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (team.toLowerCase() !== 'barcelona') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="card-id567" ref={cardRef}>
          <div className="blurry-splash"></div>

          <div className="token-container">
            <Hourglass className="creator-points" />
          </div>

          <div className="prompt-id567">
            <div className="bold-567">Próximamente</div>
            <div className="really-small-text">Estamos trabajando en ello</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
