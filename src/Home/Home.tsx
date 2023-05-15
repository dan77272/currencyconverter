import { useEffect, useState } from 'react';
import './Home.scss'
import Select from 'react-select'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

interface CurrencyData {
    success: string,
    query: Query,
    info: string,
    date: string,
    result: number
}

interface Query {
    from: string,
    to: string,
    amount: number
}

interface CreateCurrencyData{
    amount: string,
}

const schema = yup.object().shape({
    amount: yup.string().required("You must enter an amount"),
})

export const Home = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<CreateCurrencyData>({
        resolver: yupResolver(schema)
    })

    const options = [
        { value: 'BRL', label: 'BRL', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png'},
        { value: 'FJD', label: 'FJD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Fiji.svg/1920px-Flag_of_Fiji.svg.png' },
        { value: 'BGN', label: 'BGN', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png' },
        { value: 'NZD', label: 'NZD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/1920px-Flag_of_New_Zealand.svg.png' },
        { value: 'AUD', label: 'AUD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png' },
        { value: 'BND', label: 'BND', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Brunei.svg/1920px-Flag_of_Brunei.svg.png' },
        { value: 'SGD', label: 'SGD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1280px-Flag_of_Singapore.svg.png' },
        { value: 'CAD', label: 'CAD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1920px-Flag_of_Canada_%28Pantone%29.svg.png'},
        { value: 'BMD', label: 'BMD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bermuda.svg/1920px-Flag_of_Bermuda.svg.png' },
        { value: 'PAB', label: 'PAB', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/1280px-Flag_of_Panama.svg.png' },
        { value: 'BSD', label: 'BSD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_the_Bahamas.svg/1920px-Flag_of_the_Bahamas.svg.png' },
        { value: 'USD', label: 'USD', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png'},
        { value: 'CHF', label: 'CHF', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/1024px-Flag_of_Switzerland_%28Pantone%29.svg.png' },
        { value: 'EUR', label: 'EUR', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png'},
        { value: 'GBP', label: 'GBP', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1920px-Flag_of_the_United_Kingdom_%281-2%29.svg.png' },
        { value: 'KYD', label: 'KYD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_the_Cayman_Islands.svg/1920px-Flag_of_the_Cayman_Islands.svg.png' },
        { value: 'JOD', label: 'JOD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/1920px-Flag_of_Jordan.svg.png'},
        { value: 'OMR', label: 'OMR', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/1920px-Flag_of_Oman.svg.png'},
        { value: 'BHD', label: 'BHD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/1920px-Flag_of_Bahrain.svg.png'},
        { value: 'KWD', label: 'KWD', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/1920px-Flag_of_Kuwait.svg.png'},
      ]

    const [amount, setAmount] = useState(null)
    const [from, setFrom] = useState<string | undefined>("")
    const [to, setTo] = useState<string | undefined>("")
    const [currency, setCurrency] = useState<CurrencyData>()
    
    
    const getAmount = (event: React.ChangeEvent<any>) => {
        setAmount(event.target.value)
    }

    const myHeaders = new Headers();
    myHeaders.append("apikey", "s1ph6snCFJQVjn2jl0wl69my29uzEIfH");

    const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const fetchData = () => {
        if(amount !== '' && from !== "" && to !== ""){
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
            .then(response => response.text())
            .then(result => setCurrency(JSON.parse(result)))
            .catch(error => console.log('error', error));
        }
        else{
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=USD&from=CAD&amount=1`, requestOptions)
            .then(response => response.text())
            .then(result => setCurrency(JSON.parse(result)))
            .catch(error => console.log('error', error));
        }
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => amount, 1000);
        return () => clearTimeout(timeoutId);
      }, [amount]);

    useEffect(() => {
        const timeoutId = setTimeout(() => from, 1000);
        return () => clearTimeout(timeoutId);
      }, [from]);

      useEffect(() => {
        const timeoutId = setTimeout(() => to, 1000);
        return () => clearTimeout(timeoutId);
      }, [to]);


      
    return (
        <form onSubmit={handleSubmit((d) => console.log(d))}>
        <div className="home">
            <h1 className='title'>CURRENCY CONVERTER</h1>
            <div className="amount">
                <h1>Amount</h1>
                <input {...register("amount")} onChange={getAmount}/>
                <p style={{color: 'red'}}>{errors.amount?.message}</p>
            </div>
            <div className="from">
                <h1>From</h1>
                <div style={{width: '200px'}}>
                <Select options={options} onChange={(choice) => setFrom(choice?.value)} formatOptionLabel={option => (
                    <div className='currency'>
                        <img src={option.image} alt="" width='50px' height='30px'/>
                        <span>{option.label}</span>
                    </div>
                )}/>
                </div>
            </div>
            <div className="to">
                <h1>To</h1>
                <div style={{width: '200px'}}>
                <Select options={options} onChange={(choice) => setTo(choice?.value)} formatOptionLabel={option => (
                    <div className='currency'>
                        <img src={option.image} alt="" width='50px' height='30px'/>
                        <span>{option.label}</span>
                    </div>
                )}/>
                </div>
            </div>
            <input className='button' type='submit' value='convert' onClick={fetchData}/>
            <div className="test">
                {JSON.stringify(currency) && <h1>{currency?.query.amount} {currency?.query.from} = {currency?.result} {currency?.query.to}</h1>}
            </div>
            
        </div>
        </form>
    )
}