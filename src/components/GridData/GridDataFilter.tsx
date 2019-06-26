import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IDropdownOption, Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IGridDataFilterValue, GridDataFilterType } from './GridDataTypes';
import { Slider } from 'office-ui-fabric-react/lib/Slider';



export interface IGridDataFilterProps extends IGridDataFilterValue {
    // defaultValues?: any[];
    /** Required for lookup value */
    options?: IDropdownOption[];
    onFilterChange(newValue: any): void;
}

interface IGridDataFilterState {
    selectedItems: string[];
    dayRange: number;
}

export class GridDataFilter extends React.PureComponent<IGridDataFilterProps, IGridDataFilterState> {
    /**
     *
     */
    constructor(props:IGridDataFilterProps) {
        super(props);
        this.state = {
            selectedItems: [],
            dayRange: 0
        }
    }
    public render() {
        const { selectedItems } = this.state;

        const getJSX = (): JSX.Element => {
            switch (this.props.filterType) {
                case GridDataFilterType.lookup:
                    return <Dropdown
                        placeholder="Select options"
                        label={this.props.label}
                        selectedKeys={selectedItems}
                        onChange={this._onLookupChange}
                        multiSelect
                        options={this.props.options as any}
                  />
                case GridDataFilterType.date:
                    return <Slider 
                    label={`${this.props.label}: last days`} 
                    max={180} 
                    // valueFormat={(value: number) => `${value}%`} 
                    showValue={false}
                    onChange={this._onSlideChange}
                />
                case GridDataFilterType.dateBetwenAnd:
                    return <p>TODO dateBetwenAnd</p>
                default:
                    return <TextField 
                        label={this.props.label}
                        onChange={(ev,newVal)=> this.props.onFilterChange(newVal)}
                    />
            }
        }
        return (
            <div>
                {getJSX()}
            </div>
        );
    }
    private _onSlideChange = (value: number): void =>{
        this.setState({
            dayRange: value
          });
          this.props.onFilterChange(value);  
    }
    private _onLookupChange = (event: React.FormEvent<HTMLDivElement>, 
        option?: IDropdownOption, 
        index?: number | undefined): void => {

        if(!option) return;
        const item = option;

        const newSelectedItems = [...this.state.selectedItems];
        if (item.selected) {
          // add the option if it's checked
          newSelectedItems.push(item.key as string);
        } else {
          // remove the option if it's unchecked
          const currIndex = newSelectedItems.indexOf(item.key as string);
          if (currIndex > -1) {
            newSelectedItems.splice(currIndex, 1);
          }
        }
        this.setState({
          selectedItems: newSelectedItems
        });

        this.props.onFilterChange(newSelectedItems);
      };
}

export const getOptionsFromItems = (filter: IGridDataFilterValue, items: any[]): IDropdownOption[] | undefined => {
    
    if(filter.filterType === GridDataFilterType.text){
        
    }
    if(filter.filterType === GridDataFilterType.lookup){

    }

    return undefined;
}

export default GridDataFilter;
