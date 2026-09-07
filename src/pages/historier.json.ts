import type { APIRoute } from 'astro';
import { stories } from '../data/stories';

export const prerender = true;

export const GET: APIRoute = () => new Response(JSON.stringify(stories), {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
