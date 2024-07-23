import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CartDeleteDialogProps {
    isOpen: boolean;
    onOpen: React.Dispatch<React.SetStateAction<boolean>>

}
export function AlertDeleteCartDialog({ isOpen, onOpen }: CartDeleteDialogProps) {

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                onOpen(open);
            }}
        >

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-center text-2xl w-full">Hapus Produk</AlertDialogTitle>
                    <div className="border-b-2 w-100"></div>
                    <AlertDialogDescription>
                        Apakah kamu yakin ingin menghapus produk ini dari keranjang?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                    <AlertDialogAction>Ya</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}