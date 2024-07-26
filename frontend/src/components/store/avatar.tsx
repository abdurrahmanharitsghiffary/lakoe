import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function StoreAvatar({
  src,
  fallback,
  name,
}: {
  src: string;
  fallback: string;
  name: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={src} alt={fallback} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="font-semibold">{name}</span>
    </div>
  );
}
