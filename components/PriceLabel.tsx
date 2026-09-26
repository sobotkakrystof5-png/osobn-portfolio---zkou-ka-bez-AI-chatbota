const FROM_PREFIX = "od ";

/** Cena s prefixem "od" vykreslená menším, tlumeným písmem — číslo zůstává dominantní. */
export function PriceLabel({ price }: { price: string }) {
  if (!price.startsWith(FROM_PREFIX)) return <>{price}</>;

  return (
    <>
      <span className="font-inter text-[0.42em] font-normal uppercase tracking-[0.08em] opacity-55 mr-[0.3em] align-middle">
        od
      </span>
      {price.slice(FROM_PREFIX.length)}
    </>
  );
}
