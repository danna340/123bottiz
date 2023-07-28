'use client';
import { useEffect } from "react";
import { Crisp } from 'crisp-sdk-web';

type Props = {}

export const CrispChat = (props: Props) => {

    useEffect(() => {
        Crisp.configure("dc491aeb-07f4-4755-84a6-8e56d018bef5");
    },[]);

  return null
};