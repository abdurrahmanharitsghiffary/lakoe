import { Card, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function PaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    function handleMethod(method: string) {
        setPaymentMethod(method);
        setIsAlertOpen(true);
    }

    return (
        <div className="">
            <p className="text-xl font-bold">METODE PEMBAYARAN</p>
            <p className="mb-5">Toko onlinemu sudah memiliki metode pembayaran</p>

            <div className="grid place-items-center">
                <Card className="border border-gray-300 w-[500px] h-[250px] shadow-lg">
                    <CardTitle className="px-5 py-5">Akun virtual</CardTitle>
                    <div className="flex gap-4 justify-center">
                        <button
                            className={`border border-gray-300 shadow-2xl rounded-md p-3 focus:border-blue-500 focus:outline-none transition-all duration-300 active:scale-95 ${paymentMethod === 'Mandiri' ? 'border-blue-500 bg-blue-100' : ''}`}
                            onClick={() => handleMethod('Mandiri')}
                        >
                            <img src="/assets/logo-payment/mandiri.svg" alt="mandiri Icon" className="w-16" />
                        </button>
                        <button
                            className={`border border-gray-300 shadow-2xl rounded-md p-3 focus:border-blue-500 focus:outline-none transition-all duration-300 active:scale-95 ${paymentMethod === 'BNI' ? 'border-blue-500 bg-blue-100' : ''}`}
                            onClick={() => handleMethod('BNI')}
                        >
                            <img src="/assets/logo-payment/bni.svg" alt="bni Icon" className="w-16" />
                        </button>
                        <button
                            className={`border border-gray-300 shadow-2xl rounded-md p-3 focus:border-blue-500 focus:outline-none transition-all duration-300 active:scale-95 ${paymentMethod === 'BRI' ? 'border-blue-500 bg-blue-100' : ''}`}
                            onClick={() => handleMethod('BRI')}
                        >
                            <img src="/assets/logo-payment/bri.svg" alt="bri Icon" className="w-16" />
                        </button>
                        <button
                            className={`border border-gray-300 shadow-2xl rounded-md p-3 focus:border-blue-500 focus:outline-none transition-all duration-300 active:scale-95 ${paymentMethod === 'BCA' ? 'border-blue-500 bg-blue-100' : ''}`}
                            onClick={() => handleMethod('BCA')}
                        >
                            <img src="/assets/logo-payment/bca.svg" alt="bca Icon" className="w-16" />
                        </button>
                    </div>
                </Card>

                <Card className="border border-gray-300 w-[500px] h-[250px] shadow-lg mb-3">
                    <CardTitle className="px-5 py-5">E-wallet</CardTitle>
                    <button
                        className={`border border-gray-300 shadow-2xl rounded-md p-3 px-5 ml-3 focus:border-blue-500 focus:outline-none transition-all duration-300 active:scale-95 ${paymentMethod === 'OVO' ? 'border-blue-500 bg-blue-100' : ''}`}
                        onClick={() => handleMethod('OVO')}
                    >
                        <img src="/assets/logo-payment/ovo.svg" alt="OVO Icon" className="w-16" />
                    </button>
                </Card>
            </div>

            <AlertDialog open={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Metode pembayaran Terpilih:</AlertDialogTitle>
                        <AlertDialogDescription className="font-bold text-lg">
                            {paymentMethod}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-lakoe-primary" onClick={() => setIsAlertOpen(false)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
