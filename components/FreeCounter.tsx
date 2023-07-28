'use client';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"

import { MAX_FREE_COUNT } from "@/constans";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";


interface FreeCounterProps {
    apiLimitCount: number,
    isPro: boolean
};

export const FreeCounter = ({apiLimitCount=0, isPro=false}: FreeCounterProps) => {
    //manage state for hydration errors
    const [mounted, setMounded] = useState(false);

    const proModal = useProModal();


    //for manage rendering 
    useEffect(() => {
        setMounded(true);
    },[]);

    if(!mounted){
        return null;
    }

    if(isPro){
        return null;
    };
    
    return (
        <div className="p-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm mb-4 text-white space-y-2">
                        <p className="">
                            {apiLimitCount} / {MAX_FREE_COUNT} FREE GENERATIONS
                        </p>
                    </div>
                    <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNT) * 100} />

                    <Button onClick={proModal.onOpen} className="mt-4 w-full" variant="premium">
                        Upgrade
                        <Zap className="h-4 w-h ml-2 fill-white"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
};