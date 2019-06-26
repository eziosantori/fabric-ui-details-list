import * as React from 'react';
import { DetailsList, IColumn, IDetailsListProps } from 'office-ui-fabric-react/lib/DetailsList';

// import { GridDataFilterType, IGridDataFilter} from './GridDataTypes'
import './GridData.scss';

export * from './GridDataTypes'

export interface IGridDataProps extends IDetailsListProps {
    enableSorting?: boolean;
    showFilters?: boolean;
    gridMarginTop: number;
}

interface IGridDataState {
    lastItems: any[];
    _items: any[];
    width: number;
    height: number;
}

export class GridData extends React.Component<IGridDataProps, IGridDataState> {
    constructor(props: IGridDataProps) {
        super(props);
        this.state = {
            lastItems: [...this.props.items],
            _items: [...this.props.items],
            width: 0,
            height: 0,
        };
    }
    /**
     * Manage the changes of list items to be viewed in 
     * @param props 
     * @param state 
     */
    static getDerivedStateFromProps(props: IGridDataProps, state: IGridDataState) {
        if (JSON.stringify(props.items) !== JSON.stringify(state.lastItems)) {
            return {
                lastItems: [...props.items],
                _items: [...props.items]
            }
        }
        return null;
    }
    public componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render() {
        const h = `calc(100vh - ${this.props.gridMarginTop}px)`;

        return (
            <div className="GridContainer">
                <div className="GridItem" style={{ height: h }}>
                    <DetailsList
                        {...this.props}
                        items={this.state._items}
                        onColumnHeaderClick={this._onColumnHeaderClick}                        
                    />
                </div>
                {this.props.showFilters === true
                        ? <div className="GridFiltersItem" style={{ height: h }}>
                            here goes filters
                        </div>
                        : null
                }
            </div>
        );
    }
    /** Mange the sorting */
    private _onColumnHeaderClick = (ev?: React.MouseEvent<HTMLElement, MouseEvent> | undefined, column?: IColumn | undefined): void => {
        if (this.props.enableSorting === true) {

        }
    }
    private updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
}