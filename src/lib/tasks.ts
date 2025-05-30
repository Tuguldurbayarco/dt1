// src/lib/tasks.ts
export interface Task {
	from: number;
	to: number;
	text: string;
	image?: string;
	sound?: boolean;
	stacking?: boolean;
}

export const baseTasks: Task[] = [
	{ from: 0, to: 0.5, text: 'Buy Observer + Sentry, Courier', image: './ward.jpeg' },
	{ from: 0.5, to: 1, text: 'Place rune ward, escort mid', image: './ward_rune.jpeg' },
	{ from: 1, to: 2.5, text: 'Place jungle vision, scout supports' },
	{ from: 2.5, to: 4, text: 'Deward rune area, watch rotations' },
	{ from: 4, to: 6, text: '📣 Smoke Gank #1: Mid/Offlane kill + ward' },
	{ from: 6, to: 8, text: 'Deeper jungle vision, refill mid bottle' },
	{ from: 8, to: 10, text: '📣 Smoke Gank #2: Secure rune/objective' },
	{ from: 10, to: 12, text: 'Deward high ground, control runes' },
	{ from: 12, to: 14, text: '📣 Smoke Gank #3: Jungle gank carry' },
	{ from: 14, to: 17, text: 'Reset triangle vision, sentry chokes' },
	{ from: 17, to: 20, text: '📣 Smoke Gank #4: Prepare for Roshan' },
	{ from: 20, to: 25, text: 'Deep vision, control triangle, secure jungle' },
	{ from: 25, to: 30, text: '📣 Smoke Gank #5: Catch enemy split-pushing' },
	{ from: 30, to: 35, text: 'Re-establish wards, play safe vision' },
	{ from: 35, to: 40, text: '📣 Smoke Gank #6: Set up high-ground siege' },
	{ from: 40, to: 45, text: 'Check Roshan, defend triangle' },
	{ from: 45, to: 50, text: '📣 Smoke Gank #7: Break stalemate or flank' },
	{ from: 50, to: 60, text: 'Secure vision, late-game smokes, reset vision' }
];

export const stackingTasks: Task[] = Array.from({ length: 14 }, (_, i) => {
	const time = 1.53 + i * 2;
	return {
		from: time,
		to: time + 0.2,
		text: 'Stack neutral camps',
		stacking: true
	};
});
