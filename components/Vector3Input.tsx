import React from "react";

const Number = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: number;
  onChange: (val: number) => void;
}) => (
  <>
    <div>{title}</div>
    <input
      className="h-8 p-1 mx-2 w-14 input input-bordered"
      type="number"
      value={value}
      step="0.01"
      onChange={(e) => {
        if (e.target.value) {
          onChange(window.Number(e.target.value));
        }
      }}
    />
  </>
);

const Vector3 = ({
  value,
  onChange,
}: {
  value: number[];
  onChange: (val: number[]) => void;
}) => {
  const onUpdate = (index: number) => (newVal: number) => {
    onChange(value.map((val, i) => (i === index ? newVal : val)));
  };

  return (
    <div className="flex items-center">
      <Number title="x" value={value[0]} onChange={onUpdate(0)} />
      <Number title="y" value={value[1]} onChange={onUpdate(1)} />
      <Number title="z" value={value[2]} onChange={onUpdate(2)} />
    </div>
  );
};

export default Vector3;
