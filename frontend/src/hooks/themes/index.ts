import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme () {
	const [ currentTheme, setCurrentTheme ] = useState<Theme> (
		() => {
			const savedTheme = localStorage.getItem ('theme') as Theme;
			if (savedTheme) return savedTheme;

			if (window.matchMedia && window.matchMedia ('(prefers-color-scheme: dark)').matches) {
				return 'dark';
			}
			return 'light';
		}
	);

	useEffect (
		() => {
			const root = window.document.documentElement;

			root.classList.remove ('light', 'dark');
			root.classList.add (currentTheme);

			localStorage.setItem ('theme', currentTheme);
		}, [ currentTheme ]
	);

	const toggleCurrentTheme = () => {
		return setCurrentTheme (
			(previous) => {
				return previous === 'light' ? 'dark' : 'light';
			}
		);
	}

	return { currentTheme, toggleCurrentTheme };
}