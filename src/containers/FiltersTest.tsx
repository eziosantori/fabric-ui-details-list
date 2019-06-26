import React from 'react';
import { PrimaryButton, values } from 'office-ui-fabric-react';
import {SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { GridData } from '../components/GridData/GridData';

const _items1 = [
    { key: 1, date: new Date(), text: 'Testo', number: 1 },
    { key: 2, date: new Date(), text: 'asd as asfd', number: 22 },
    { key: 3, date: new Date(), text: 'Testo 3', number: 33 },
]
const _items2 = [
    { key: 11, date: new Date(), text: 'Testo asd as', number: 1 },
    { key: 22, date: new Date(), text: 'asasf ', number: 11 },
    { key: 33, date: new Date(), text: 'Testo 3', number: 12 },
    { key: 4, date: new Date(), text: 'asasf ', number: 4 },
    { key: 3, date: new Date(), text: 'Testo 3', number: 3 },
]

export interface IFiltersTestProps {

}

interface IFiltersTestState {
    items: any[];
    current: number;
    selMode: SelectionMode;
}

export class FiltersTest extends React.Component<IFiltersTestProps, IFiltersTestState> {
    state = {
        items: _items1,
        current: 1,
        selMode: SelectionMode.multiple,
    }
    render() {
        return (
            <div>
                <PrimaryButton onClick={this.handleSwitchClick}>Switch data</PrimaryButton>
                <PrimaryButton onClick={this.handleSwitchSelModeClick}>Switch selmode</PrimaryButton>
                <GridData 
                    items={this.state.items}
                    gridMarginTop={50}
                    selectionMode={this.state.selMode}
                    onRenderItemColumn={this._onRenderItemColumn}
                />
            </div>

        );
    }
    private _onRenderItemColumn = (item?: any, index?: number | undefined, column?: IColumn | undefined): React.ReactNode => {
        const fieldName = column ? column.fieldName : ""
        switch (fieldName) {
            case "date":
                return item.date.toDateString();
            default:
                return item[fieldName as any];
        }
    }
    private handleSwitchClick = () => {
        switch (this.state.current) {
            case 1:
                this.setState({current: 2, items: _items2 })
                break;
            case 2:
                this.setState({current: 1, items: _items1 })
                break;

            default:
                break;
        }
    }
    private handleSwitchSelModeClick = () => {
        if(this.state.selMode===2){
            this.setState({selMode: 0});
            return;
        };
        this.setState({selMode: this.state.selMode+1});
    }
}