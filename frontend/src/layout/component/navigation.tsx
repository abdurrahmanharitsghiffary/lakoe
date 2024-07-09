import { BiHomeCircle } from "react-icons/bi";
import { IoMdCube } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Accordion,AccordionContent,AccordionTrigger,AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";


function Navigation(){
    return(
        <div className="flex flex-col mr-2 gap-4 h-screen px-1 py-12">
            <Button variant='ghost'size="lg" className="flex w-full justify-start items-center py-3">
                    <BiHomeCircle className="ml-1 mr-2 h-8 w-8"/>
                    <h1 className="text-lg">
                        Dashboard
                    </h1>
            </Button>
            <Button variant='secondary'size="lg" className="flex w-full justify-start items-center py-3">
                    <IoMdCube className="ml-1 mr-2 h-8 w-8" color="blue"/>
                    <h1 className="text-lg" style={{ color: '#0000FF' }}>
                       Produk
                    </h1>
            </Button>
            <Button variant='ghost'size="lg" className="flex w-full justify-start items-center py-3">
                    <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8"/>
                    <h1 className="text-lg">
                       Pesanan
                    </h1>
            </Button>
            <Accordion type="single" collapsible style={{marginTop:'-15px'}}>
                <AccordionItem value="item-1">
                        <AccordionTrigger>
                                <Button variant='ghost'size="lg" className="flex w-full justify-start items-center">
                                <IoSettingsOutline className="ml-1 mr-2 h-8 w-8"/>
                                <h1 className="text-lg">
                                        Pengaturan
                                </h1>
                              </Button>
                        </AccordionTrigger>
                                <AccordionContent className="flex flex-col justify-center gap-4 ml-8">
                                <Button variant='ghost'size="lg" className="flex w-full justify-start items-center">
                                <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8"/>
                                <h1 className="text-lg">
                                       Pesanan
                                </h1>
                                </Button>
                                <Button variant='ghost'size="lg" className="flex w-full justify-start items-center">
                                <LiaShoppingBagSolid className="ml-1 mr-2 h-8 w-8"/>
                                <h1 className="text-lg">
                                       Pesanan
                                </h1>
                                </Button>
                                </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button variant='ghost'size="lg" className="flex w-full justify-start items-center" style={{marginTop:'320px'}}>
                                <CgProfile className="ml-1 mr-2 h-8 w-8"/>
                                <h1 className="text-lg">
                                       Profil
                                </h1>
            </Button>
        </div>


    )
}

export default Navigation