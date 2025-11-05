import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      'https://vglkuynxhbpcygmouspl.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnbGt1eW54aGJwY3lnbW91c3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjkxMzksImV4cCI6MjA3Nzg0NTEzOX0.TuDGJvs2IPfYihD9jSGjtN18Z7Mz_BoutP48OrM6JDw'
    );
    this.initializeAuthState();
  }

  private initializeAuthState() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (session?.user) {
          this.currentUserSubject.next({
            id: session.user.id,
            email: session.user.email || ''
          });
        } else {
          this.currentUserSubject.next(null);
        }
      })();
    });
  }

  async signUp(email: string, password: string): Promise<{ user: User; error: null } | { user: null; error: string }> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        return {
          user: {
            id: data.user.id,
            email: data.user.email || ''
          },
          error: null
        };
      }

      return { user: null, error: 'Failed to create user' };
    } catch (err) {
      return { user: null, error: 'An error occurred during signup' };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User; error: null } | { user: null; error: string }> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        this.currentUserSubject.next({
          id: data.user.id,
          email: data.user.email || ''
        });

        return {
          user: {
            id: data.user.id,
            email: data.user.email || ''
          },
          error: null
        };
      }

      return { user: null, error: 'Failed to sign in' };
    } catch (err) {
      return { user: null, error: 'An error occurred during sign in' };
    }
  }

  async signOut(): Promise<{ error: null } | { error: string }> {
    try {
      const { error } = await this.supabase.auth.signOut();

      if (error) {
        return { error: error.message };
      }

      this.currentUserSubject.next(null);
      return { error: null };
    } catch (err) {
      return { error: 'An error occurred during sign out' };
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  async checkAuthStatus(): Promise<boolean> {
    try {
      const { data } = await this.supabase.auth.getSession();
      if (data.session?.user) {
        this.currentUserSubject.next({
          id: data.session.user.id,
          email: data.session.user.email || ''
        });
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
