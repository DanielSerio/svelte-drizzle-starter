// See https://kit.svelte.dev/docs/types#app

import type { UserPayload } from '$lib/common/types';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			status: number;
			message: string;
		}
		interface Locals {
			token: string;
			user: UserPayload;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface FormResponse {
			name?: string;
			success: boolean;
			error?: string | null;
		}
	}
}

export {};
