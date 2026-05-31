import styled from 'styled-components';

export const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    color: #37352f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    padding-top: 80px;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
`;

export const StickyHeaderContainer = styled.div`
    top: 80px;
    background-color: #ffffff;
    z-index: 10;
    padding-top: 40px;
    padding-bottom: 12px;
`;

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
`;

export const PageTitle = styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.02em;
`;

export const MonthNav = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const MonthText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #787774;
    min-width: 80px;
    text-align: center;
`;

export const NavButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #787774;
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
        background: #efefef;
        color: #37352f;
    }
`;

export const SectionHeader = styled.div`
    margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 4px 0;
`;

export const SectionSubtitle = styled.p`
    font-size: 14px;
    color: #787774;
    margin: 0;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid #ededeb;
    padding-bottom: 24px;
`;

export const SearchInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f7f7f5;
    border-radius: 6px;
    padding: 6px 12px;
    width: 100%;
    max-width: 400px;
    border: 1px solid transparent;
    transition: border 0.2s;

    &:focus-within {
        border-color: #e2e2e0;
        background: #ffffff;
    }

    i {
        color: #9a9a97;
        font-size: 14px;
    }

    input {
        border: none;
        background: transparent;
        outline: none;
        font-size: 14px;
        color: #37352f;
        width: 100%;

        &::placeholder {
            color: #9a9a97;
        }
    }
`;

export const Tabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`;

export const Tab = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${props => props.$active ? '#efefef' : 'transparent'};
    border: none;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 14px;
    color: ${props => props.$active ? '#37352f' : '#787774'};
    cursor: pointer;
    transition: all 0.2s;
    font-weight: ${props => props.$active ? '500' : '400'};

    &:hover {
        background: #efefef;
    }

    i {
        font-size: 13px;
    }
`;

export const ScrollableContent = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    padding-top: 12px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
`;

export const DayCard = styled.div`
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 8px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    height: 120px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.1s;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    &:active {
        transform: scale(0.99);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: #787774;
    font-size: 12px;
    margin-bottom: 8px;

    i {
        font-size: 11px;
    }
`;

export const CardBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.$isEmpty ? 'center' : 'flex-start'};
`;

export const CardTitle = styled.div`
    font-size: 14px;
    font-weight: ${props => props.$hasDiary ? '500' : '400'};
    color: ${props => props.$hasDiary ? '#37352f' : '#9a9a97'};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
`;

export const PlusIcon = styled.div`
    color: #d3d3d1;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const CardFooter = styled.div`
    height: 24px;
    display: flex;
    align-items: flex-end;
`;

export const EmotionTag = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f7f7f5;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #50504b;
`;

export const ColorDot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.$color};
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #f7f7f5;
    }
`;

export const ItemLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    i {
        color: #787774;
        font-size: 14px;
    }
`;

export const ItemTitle = styled.span`
    font-size: 14px;
    color: #37352f;
    font-weight: 500;
`;

export const ItemRight = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const ItemDate = styled.span`
    font-size: 13px;
    color: #787774;
`;

export const EmptyState = styled.div`
    padding: 40px 0;
    text-align: center;
    color: #9a9a97;
    font-size: 14px;
`;