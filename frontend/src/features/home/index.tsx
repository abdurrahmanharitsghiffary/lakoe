import { Header } from "./header";
import { Image } from "./image";
import { Product } from "./product";
import { TopCategories } from "./top-category";

export function Home() {
  return (
    <div>
      <Header />
      <div className="py-20 pt-28">
        <Image />
        <TopCategories />
        <Product />
      </div>
    </div>
  );
}
