import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Tuple } from './types/Tuple';
import { datepickerCtx } from './utils/ctx';
import { DatePickerProps } from './DatePicker';
import { ArrowBackIcon, ArrowDownIcon, ArrowForwardIcon, ArrowUpIcon } from './Icons';

interface HeaderProps extends Required<Pick<DatePickerProps, 'calendarOrientation'>> {
    months: Tuple<string, 1 | 2>;
    label?: string;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CenterButton = styled.div<{ horizontalPosition?: string }>`
    position: relative;
    top: 10%;
    right: ${({ horizontalPosition }) => horizontalPosition};
`;

const Button = styled.button`
    border: none;
    background: none;
    color: black;
    height: fit-content;
    padding: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    outline: none;
    border: 1px solid black;
`;

const Label = styled.header`
    font-weight: 550;
    margin: 0;
    font-size: 21px;
    line-height: 28px;
    margin-right: 10px;
`;

const Gap = styled.div`
    margin-left: 10px;
    margin-right: 10px;
`;

const ArrowIcon: React.FC<{
    calendarOrientation: 'horizontal' | 'vertical';
    IconOnHorizontal?: React.ReactNode;
    positionOnHorizontal?: string;
    IconOnVertical?: React.ReactNode;
    positionOnVertical?: string;
}> = ({ calendarOrientation, IconOnHorizontal, positionOnHorizontal, IconOnVertical, positionOnVertical }) => {
    return (
        <CenterButton
            horizontalPosition={calendarOrientation === 'horizontal' ? positionOnHorizontal : positionOnVertical}
        >
            {calendarOrientation === 'horizontal' ? IconOnHorizontal : IconOnVertical}
        </CenterButton>
    );
};

const Header: React.FC<HeaderProps> = ({ label, months, calendarOrientation }) => {
    const { onNext, onPrevious } = useContext(datepickerCtx);
    const isPair = months.length == 2;
    return (
        <Container>
            <Label>{label}</Label>
            <ButtonContainer>
                <Button
                    onClick={() => onPrevious()}
                    aria-label={`Previous ${isPair ? 'pair of months' : 'month'}`}
                    type="button"
                >
                    <ArrowIcon
                        calendarOrientation={calendarOrientation}
                        IconOnHorizontal={<ArrowBackIcon width="15px" height="15px" />}
                        positionOnHorizontal="5%"
                        IconOnVertical={<ArrowUpIcon width="15px" height="15px" />}
                        positionOnVertical="0%"
                    />
                </Button>
                <Gap />
                <Button
                    onClick={() => onNext()}
                    aria-label={`Next ${isPair ? 'pair of months' : 'month'}`}
                    type="button"
                >
                    <ArrowIcon
                        calendarOrientation={calendarOrientation}
                        IconOnHorizontal={<ArrowForwardIcon width="15px" height="15px" />}
                        positionOnHorizontal="-10%"
                        IconOnVertical={<ArrowDownIcon width="15px" height="15px" />}
                        positionOnVertical="0%"
                    />
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default Header;
