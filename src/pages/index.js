import {Input} from '@/components/ui/input'
import {
    Select,
    SelectContent, SelectGroup, SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import ThereeDText from "@/components/theree-d-text";

export default function Index() {
    const [text, setText] = useState('E=mc²')
    const [option, setOption] = useState('Neon')
    const [fee, setFee] = useState('123,123€')
    const [color, setColor] = useState('#fec902')

    const textChangeHandle = e => {
        setFee(randomEuro())
        setText(e.target.value)
    }

    const colorChangeHandle = e => {
        setFee(randomEuro())
        setColor(e.target.value)
    }

    const valueChangeHandle = e => {
        setFee(randomEuro())
        setOption(e)
    }

    const submitHandle = (e) => {
        e.preventDefault()
    }

    return (
        <section>
            <div className="container mx-auto">
                <div className="grid grid-cols-2">
                    <div className="p-10 pl-0 pt-0">
                        <div className="w-full border aspect-square rounded-xl overflow-hidden">
                            <ThereeDText text={text} color={color}/>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-3xl mb-3 text-gray-800"> Özel Tasarım Kutu Harf </h1>
                        <h4 className="font-medium text-xl text-gray-700 pb-6 border-b mb-6"> {fee} </h4>
                        <form onSubmit={submitHandle} className="grid gap-4">
                            <Input placeholder="Metin Girin." value={text} onInput={textChangeHandle}/>
                            <Select onValueChange={valueChangeHandle} value={option}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Bir Stil Seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Stiller</SelectLabel>
                                        <SelectItem value="Neon">Neon</SelectItem>
                                        <SelectItem value="Pırlanta">Pırlanta Kutu Harf</SelectItem>
                                        <SelectItem value="Pleksi">Pleksi Kutu Harf</SelectItem>
                                        <SelectItem value="Alüminyum">Alüminyum Kutu Harf</SelectItem>
                                        <SelectItem value="Bombeli">Bombeli Kutu Harf</SelectItem>
                                        <SelectItem value="Retro">Retro Kutu Harf</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center justify-between">
                                <Input type='color' className="aspect-square w-40 h-10 p-1" onInput={colorChangeHandle} value={color}></Input>
                                <Button>Sepete Ekle</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

function randomEuro(min = 100, max = 20000) {
    const rastgeleSayi = Math.random() * (max - min) + min;
    const euroFiyati = rastgeleSayi.toFixed(2);
    return euroFiyati.toLocaleString() + " €";
}