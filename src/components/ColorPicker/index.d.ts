export interface ColorConfigItem {
  name: string;
  label: string;
  value: string;
}

export interface ColorPickerProps {
  config: ColorConfigItem[];
  colors: object;
}
