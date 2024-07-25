import { Link } from "react-router-dom";

export function LakoeTitle() {
  return (
    <Link to="/" className="flex-1 gap-2 flex items-center font-bold text-2xl">
      <img src="/assets/lakoe.png" className="w-8" alt="Lakoe Logo" />
      <span>Lakoe</span>
    </Link>
  );
}
