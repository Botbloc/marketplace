import * as React from 'react';
import Card from './Card';

const Info: React.FC = () => {
    return (
        <>
            <div className="container h-[100%] m-auto">
                <div className="flex h-[100%] flex-row gap-5 justify-center">
                    <div className="flex-grow">
                        <Card></Card>
                    </div>
                    <div className="flex flex-col flex-grow gap-5">
                        <div className="flex flex-row flex-grow gap-5">
                            <Card></Card>
                            <Card></Card>
                        </div>
                        <div className="flex-grow">
                            <Card></Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info;