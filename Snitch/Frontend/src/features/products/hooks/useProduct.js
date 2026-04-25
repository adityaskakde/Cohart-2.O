import { createProduct , getSellerProducts} from "../services/Product.api";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../state/Product.slice";


export const useProduct = () =>{

    const dispatch = useDispatch();

    async function handleCreateProduct(formData){
        const data = await createProduct(formData);
        return data;
    }

    async function handleGetSellerProducts(){
        const data = await getSellerProducts();
        dispatch(setSellerProducts(data));
        return data;
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts
    }
}