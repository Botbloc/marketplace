import React from 'react';
import classNames from 'classnames';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
//import Image from '../../elements/Image';
import Image from 'next/image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
      
    >     
        <h2 className="m-0" >
            <Link href="/">
                <Image
                  src={require('../../../assets/images/BotBloc.png')}
                  width={48}
                  height={48}
                  alt="BotBloc"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,..."
                />
            </Link>
            

        </h2>
      
      
        
      
      
    </div>
    
  );
}

export default Logo;