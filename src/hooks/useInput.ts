import { useState } from "react";

export const useInput = <T extends Record<string, string | number | []>>(
	defaultValue: T
) => {
	const [values, setValues] = useState<T>(defaultValue);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const bindings = {
		...Object.keys(defaultValue).reduce(
			(acc, key) => {
				acc[key as keyof T] = {
					value: values[key as keyof T],
					onChange
				};
				return acc;
			},
			{} as { [K in keyof T]: { value: T[K]; onChange: typeof onChange } }
		)
	};
	return {
		inputs: bindings,
		values
	};
};
