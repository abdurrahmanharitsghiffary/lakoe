import { Header } from "./header";
import { Image } from "./image"
import { Product } from "./product";
import { TopCategories } from "./top-category";

export function Home() {
    return (
        <div>
            <Header />
            <Image/>
            <TopCategories/>
            <Product/>
        </div>
    )
}