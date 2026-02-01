import 'react';

declare module 'react' {
  interface VideoHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
  
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }

  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}