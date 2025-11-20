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
        
    <Link href="/">
        <Image
          src={require('../../../assets/images/botbloc logo new 2.png')}
          width={120}
          height={28}
          alt="BotBloc"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,..."
        />
    </Link>
    </div>
    
  );
}

export default Logo;