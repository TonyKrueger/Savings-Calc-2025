import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EditHeatSourceDialog } from './EditHeatSourceDialog';
import { ELECTRICITY, FUEL_OIL } from '../config/calculator';
import { HeatSource } from '../types/calculator';

vi.mock('lucide-react', () => ({
  Check: () => null,
  ChevronDown: () => null,
  ChevronUp: () => null,
  X: () => null,
  Circle: () => null,
  Settings2: () => null,
  RotateCcw: () => null,
}));

vi.mock('@radix-ui/react-select', () => {
  const Content = ({ children }: any) => children;
  const Trigger = ({ children, ...props }: any) => {
    return React.cloneElement(children, props);
  };

  const Root = ({ children, value, onValueChange }: any) => {
    const childArray = React.Children.toArray(children);
    const trigger = childArray.find((child: any) => 
      React.isValidElement(child) && 
      child.type === Trigger
    ) as React.ReactElement | undefined;
    const content = childArray.find((child: any) => 
      React.isValidElement(child) && child.type === Content
    );
    
    return (
      <select 
        data-testid={trigger?.props?.['data-testid']} 
        value={value} 
        onChange={(e) => onValueChange?.(e.target.value)}
      >
        {React.isValidElement(content) ? content.props.children : null}
      </select>
    );
  };

  const Value = ({ children }: any) => children;
  const Portal = ({ children }: any) => children;
  const ScrollUpButton = () => null;
  const ScrollDownButton = () => null;
  const Viewport = ({ children }: any) => children;
  const Item = ({ children, value }: any) => (
    <option value={value}>{children}</option>
  );
  const ItemText = ({ children }: any) => children;
  const ItemIndicator = () => null;
  const Group = ({ children }: any) => children;
  const Label = ({ children }: any) => children;
  const Separator = () => null;
  const Icon = () => null;

  return {
    Root,
    Trigger,
    Value,
    Portal,
    Content,
    ScrollUpButton,
    ScrollDownButton,
    Viewport,
    Item,
    ItemText,
    ItemIndicator,
    Group,
    Label,
    Separator,
    Icon,
  };
});

vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, open, onOpenChange }: any) => (
    <div data-open={open}>{open ? children : null}</div>
  ),
  Portal: ({ children }: any) => <div>{children}</div>,
  Overlay: () => <div data-testid="dialog-overlay" />,
  Content: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  Title: ({ children }: any) => <h2>{children}</h2>,
  Description: ({ children }: any) => <p>{children}</p>,
  Close: ({ children }: any) => <button>{children}</button>,
  Trigger: ({ children }: any) => <div>{children}</div>,
  Footer: ({ children }: any) => <div data-testid="dialog-footer">{children}</div>,
}));

vi.mock('@radix-ui/react-label', () => ({
  Root: ({ children, htmlFor }: any) => <label htmlFor={htmlFor}>{children}</label>,
}));

vi.mock('@radix-ui/react-radio-group', () => ({
  Root: ({ children, value, onValueChange }: any) => (
    <div data-testid="radio-group" data-value={value} onChange={(e: any) => onValueChange?.(e.target.value)}>
      {children}
    </div>
  ),
  Item: ({ children, value, id }: any) => (
    <div data-testid={`radio-item-${id}`} data-value={value}>
      <input type="radio" id={id} value={value} />
      {children}
    </div>
  ),
  Indicator: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, id, ...props }: any) => (
    <input 
      value={value} 
      onChange={onChange} 
      {...props} 
      data-testid={`input-${id}`} 
      id={id} 
    />
  ),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant }: any) => (
    <button onClick={onClick} data-testid={`button-${variant || 'default'}`}>
      {children}
    </button>
  ),
}));

// Mock the Select component from our UI components
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div>{children}</div>
  ),
  SelectContent: ({ children }: any) => children,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children, 'data-testid': dataTestId }: any) => (
    <select data-testid={dataTestId} className="select-trigger">
      {children}
    </select>
  ),
  SelectValue: ({ children }: any) => children,
}));

describe('EditHeatSourceDialog', () => {
  const mockHeatSource: HeatSource = {
    type: 'water heater',
    fuelType: FUEL_OIL,
    costPerUnit: 0.18,
    quantity: 100,
    waterHeaterDuration: 6,
    measurementType: 'monthlyUnits'
  };

  it('renders with initial heat source data', () => {
    render(
      <EditHeatSourceDialog
        isOpen={true}
        onClose={() => {}}
        onSave={() => {}}
        heatSource={mockHeatSource}
      />
    );

    // Just check that the input value is set correctly
    expect(screen.getByTestId('input-value')).toHaveValue(100);
    expect(screen.getByTestId('input-cost')).toHaveValue(0.18);
  });

  it('calls onSave with updated data when save button is clicked', () => {
    const onSave = vi.fn();
    render(
      <EditHeatSourceDialog
        isOpen={true}
        onClose={() => {}}
        onSave={onSave}
        heatSource={mockHeatSource}
      />
    );

    const valueInput = screen.getByTestId('input-value');
    fireEvent.change(valueInput, { target: { value: '200' } });
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
      quantity: 200,
    }));
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = vi.fn();
    render(
      <EditHeatSourceDialog
        isOpen={true}
        onClose={onClose}
        onSave={() => {}}
        heatSource={mockHeatSource}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('updates cost per unit when changed', () => {
    const onSave = vi.fn();
    render(
      <EditHeatSourceDialog
        isOpen={true}
        onClose={() => {}}
        onSave={onSave}
        heatSource={mockHeatSource}
      />
    );

    const costInput = screen.getByTestId('input-cost');
    fireEvent.change(costInput, { target: { value: '0.25' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
      costPerUnit: 0.25,
    }));
  });

  it('handles water heater duration changes', () => {
    const onSave = vi.fn();
    render(
      <EditHeatSourceDialog
        isOpen={true}
        onClose={() => {}}
        onSave={onSave}
        heatSource={mockHeatSource}
      />
    );

    // Find and click the radio input for 12 months
    const radioInput = screen.getByTestId('radio-item-12months').querySelector('input');
    if (radioInput) {
      fireEvent.click(radioInput);
    }

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalled();
  });
}); 