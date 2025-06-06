<script lang="ts">
	import { onMount } from 'svelte';
	import { baseTasks, stackingTasks, type Task } from '$lib/tasks';

	let startTime = 0;
	let currentTime = 0;
	let running = false;
	let timerInterval: any;
	let stackingEnabled = false;
	let audio: any;

	let tasks: Task[] = [];
	let currentTask: Task | null = null;
	let nextTask: Task | null = null;
	let showNextCover = false;

	const tick = () => {
		const now = Date.now();
		currentTime = (now - startTime) / 60000;
		updateTask();
		saveState();
	};

	const start = () => {
		triggerVibrationClick();
		if (!running) {
			startTime = Date.now() - currentTime * 60000;
			timerInterval = setInterval(tick, 1000);
			running = true;
		}
	};

	const pause = () => {
		triggerVibrationClick();
		if (running) {
			clearInterval(timerInterval);
			running = false;
		}
	};

	const stop = () => {
		triggerVibrationClick();
		clearInterval(timerInterval);
		running = false;
		currentTime = 0;
		updateTask();
		saveState();
	};

	const setCustomMinute = (min: number) => {
		currentTime = min;
		if (running) {
			startTime = Date.now() - currentTime * 60000;
		}
		updateTask();
	};

	const formatTime = (minutes: number) => {
		const m = Math.floor(minutes);
		const s = Math.floor((minutes - m) * 60);
		return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
	};

	const updateTask = () => {
		const allTasks = stackingEnabled ? [...baseTasks, ...stackingTasks] : baseTasks;
		tasks = allTasks.sort((a, b) => a.from - b.from);

		currentTask = tasks.find((t) => currentTime >= t.from && currentTime < t.to) || null;
		nextTask = tasks.find((t) => t.from > currentTime) || null;

		if (currentTask !== lastAlertedTask) {
			playSound();
			triggerVibration();
			triggerNextCover();
			lastAlertedTask = currentTask;
		}
	};

	function triggerNextCover() {
		if (running === false) return;
		showNextCover = true;
		console.log('showNextCover:', showNextCover); // true

		setTimeout(() => {
			showNextCover = false;
			console.log('showNextCover:', showNextCover); // false after 3 seconds
		}, 5000);
	}

	function triggerVibration() {
		if (navigator.vibrate) {
			navigator.vibrate([300, 100, 300, 100, 300, 100, 300, 100, 300, 100, 300]); // pattern: vibrate-pause-vibrate
		} else {
			console.warn('Vibration API not supported on this device.');
		}
	}

	function triggerVibrationClick() {
		if (navigator.vibrate) {
			navigator.vibrate([200]); // pattern: vibrate-pause-vibrate
		} else {
			console.warn('Vibration API not supported on this device.');
		}
	}

	const playSound = () => {
		audio?.play();
	};

	let lastAlertedTask: Task | null = null;

	const saveState = () => {
		localStorage.setItem('timerTime', JSON.stringify(currentTime));
		localStorage.setItem('stackingEnabled', JSON.stringify(stackingEnabled));
	};

	const restoreState = () => {
		const stored = localStorage.getItem('timerTime');
		const stacking = localStorage.getItem('stackingEnabled');
		if (stored) currentTime = parseFloat(stored);
		if (stacking) stackingEnabled = JSON.parse(stacking);
		updateTask();
	};

	onMount(() => {
		audio = new Audio('/ding.mp3'); // You can replace with any local sound
		restoreState();
		if (running) {
			start();
		} else {
			updateTask();
		}
	});
</script>

<main class="mx-auto max-w-lg space-y-6 p-4">
	<!-- <h1 class="text-center text-2xl font-bold text-yellow-300">Dota 1 Hard Support Guide</h1> -->

	<div class="flex items-center justify-center gap-2 font-mono text-3xl">
		⏱️ {formatTime(currentTime)}
	</div>

	<div class="flex justify-center gap-2">
		<button on:click={start} class="rounded bg-green-600 px-4 py-2 hover:bg-green-700">Start</button
		>
		<button on:click={pause} class="rounded bg-yellow-600 px-4 py-2 hover:bg-yellow-700"
			>Pause</button
		>
		<button on:click={stop} class="rounded bg-red-600 px-4 py-2 hover:bg-red-700">Stop</button>
	</div>

	<div class="flex items-center gap-2">
		<input
			type="number"
			min="0"
			max="60"
			placeholder="Start at minute"
			class="w-full rounded px-2 py-1 text-white"
			on:change={(e) => setCustomMinute(parseFloat((e.target as HTMLInputElement).value || '0'))}
		/>
	</div>
	<!-- 
	<label class="flex items-center gap-2 text-sm">
		<input
			type="checkbox"
			bind:checked={stackingEnabled}
			on:change={() => {
				updateTask();
				saveState();
			}}
		/>
		Show stacking tasks
	</label> -->

	{#if currentTask}
		<div class="task-alert rounded border border-yellow-400 bg-gray-800 p-4">
			<h2 class="text-lg text-white">Current Task</h2>
			<p class="py-2 text-2xl font-semibold text-yellow-300">{currentTask.text}</p>
			<div class="flex h-[350px] max-h-[350px] justify-center">
				<img
					src={currentTask.image ?? `./default-task.png`}
					alt={currentTask.text}
					style="object-fit: cover;"
				/>
			</div>

			<!-- <img
				src={currentTask.image ?? `${base}/static/default-task.png`}
				alt="Task image"
				class="mt-2 w-full rounded"
			/> -->
		</div>
	{/if}

	{#if nextTask}
		<div class="mt-4 rounded bg-gray-700 p-4">
			<h2 class="text-md font-semibold text-gray-300">
				Next Up (at {nextTask.from.toFixed(1)} min)
			</h2>
			<p class="text-lg font-semibold">{nextTask.text}</p>
		</div>
	{/if}

	{#if showNextCover}
		<div
			class="text-2x fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-white"
		>
			<p class="text-2xl font-bold text-blue-800">Next Objective:</p>
			<p class="mx-auto py-2 text-center text-3xl font-semibold text-black">{currentTask?.text}</p>
		</div>
	{/if}
</main>

<style>
	.task-alert {
		animation: pulse 1s 1;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}
</style>
