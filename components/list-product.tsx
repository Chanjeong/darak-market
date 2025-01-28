import { formatToTime, formatToWon } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ListProductProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  created_at: Date;
}

export default function ListProduct({
  id,
  title,
  price,
  photo,
  created_at
}: ListProductProps) {
  return (
    <Link
      href={`products/${id}`}
      className="flex gap-5 border-b border-neutral-600 py-3">
      <div className="relative size-32 rounded-md overflow-hidden">
        <Image src={photo} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col *:text-white gap-1">
        <span className="text-lg">{title}</span>
        <span className="text-sm">{formatToTime(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
