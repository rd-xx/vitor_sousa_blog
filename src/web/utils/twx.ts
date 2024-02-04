import { createTwc } from "react-twc"
import { twMerge } from "tailwind-merge"
import { ClassValue, cnBase } from "tailwind-variants"

const merge = (...inputs: ClassValue[]) => twMerge(cnBase(inputs))

export const twx = createTwc({ compose: merge })
