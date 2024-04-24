import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Midterm() {
    const productContract = useSelector(state => state.addContract.productContract);
    const product = useSelector(state => state.addContract.product);

    async function modifier(id) {
        // FIXME: Write Modifier for midTermRegister
        const crops = await productContract.getCrops();
        const filterCrop = crops.filter((crop) => crop.id == id);
    }

    async function midTermRegister(id, progress, months) {
        try {
            const date = new Date();
            const timeofApplied = date.toLocaleString();
            await productContract.midTermRegister(id, progress, months, timeofApplied);
            productContract.once("midTermRegisterEvent", (id) => {
                toast.success("MidTerm Registration success");
            })
        } catch (error) {
            toast.error(error);
        }
    }

    async function getMidTerms() {
        const midTermList = await productContract.getMidTerm();
        return midTermList;
    }

    async function deleteMidTerm(ETHAddress) {
        await product.deleteMidterm(ETHAddress);
    }

    return { midTermRegister, getMidTerms, deleteMidTerm };
}

export default Midterm;