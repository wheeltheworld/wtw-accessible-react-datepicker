import React, { SVGProps } from 'react';

const Icon: React.FC<SVGProps<SVGSVGElement>> = ({ children, width, height, style, ...props }) => {
    return (
        <svg
            {...props}
            width={width || '100px'}
            height={height || '100px'}
            style={{ maxHeight: '100%', maxWidth: '100%', ...style }}
        >
            {children}
        </svg>
    );
};

export const ArrowForwardIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <Icon viewBox="0 0 10 17" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1,16l8-7.7L1,1"
        />
    </Icon>
);

export const ArrowBackIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <Icon viewBox="0 0 10 17" fill="none" {...props}>
        <path
            d="M9.03894 1L0.999941 8.663L9.03894 16"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Icon>
);

export const ArrowUpIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5,16l-7.7-8l-7.3,8"
        />
    </Icon>
);

export const ArrowDownIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5,8l7.7,8l7.3-8"
        />
    </Icon>
);
