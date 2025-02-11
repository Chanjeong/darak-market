'use client';

import { InitialProducts } from '@/app/(tabs)/products/page';
import ListProduct from './list-product';
import { useEffect, useRef, useState } from 'react';
import { fetchProductPage } from '@/app/(tabs)/products/fetchProduct';

interface Product {
  id: number;
  title: string;
  price: number;
  photo: string;
  created_at: Date;
}

interface InitialProductsProps {
  initialProducts: InitialProducts;
  fetchProductPage: (page: number) => Promise<Product[]>;
}

export function ProductList({
  initialProducts,
  fetchProductPage
}: InitialProductsProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entries[0].isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          const newProducts = await fetchProductPage(page + 1);
          if (newProducts.length !== 0) {
            setPage(prev => prev + 1);
            setProducts(prev => [...prev, ...newProducts]);
          }
        }
      },
      {
        threshold: 1.0
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page, fetchProductPage]);

  return (
    <div className="p-5 flex flex-col gap-5 ">
      {products.map(product => (
        <ListProduct key={product.id} {...product} />
      ))}
      <span ref={trigger} className=""></span>
    </div>
  );
}
