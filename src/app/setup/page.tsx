import { redirect } from 'next/navigation';

// This page auto-triggers database initialization
export default async function SetupPage() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : '';
    
    const res = await fetch(`${baseUrl}/api/setup`, { method: 'POST' });
    const data = await res.json();
    
    if (data.success) {
      console.log('Database initialized:', data);
    }
  } catch (error: any) {
    console.error('Auto-setup failed:', error.message);
  }
  
  // Redirect to home after attempting setup
  redirect('/');
}
