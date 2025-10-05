import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Analytics event types
export type AnalyticsEvent = 
  | 'page_view'
  | 'user_signup'
  | 'user_login'
  | 'user_logout'
  | 'garage_sale_created'
  | 'garage_sale_viewed'
  | 'featured_item_added'
  | 'image_uploaded'
  | 'error_occurred'
  | 'button_clicked'
  | 'form_submitted';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
}

class AnalyticsService {
  private isEnabled: boolean;
  private userId?: string;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.userId = undefined;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  clearUserId() {
    this.userId = undefined;
  }

  track(event: AnalyticsEvent, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log('Analytics (dev):', event, properties);
      return;
    }

    const eventData: AnalyticsEventData = {
      event,
      properties,
      userId: this.userId,
      timestamp: Date.now(),
    };

    // In production, send to your analytics service
    this.sendToAnalytics(eventData);
  }

  private sendToAnalytics(eventData: AnalyticsEventData) {
    // Example: Send to Google Analytics, Mixpanel, PostHog, etc.
    // For now, we'll just log to console in production
    console.log('Analytics (prod):', eventData);
    
    // Example implementations:
    // Google Analytics 4:
    // gtag('event', eventData.event, eventData.properties);
    
    // Mixpanel:
    // mixpanel.track(eventData.event, eventData.properties);
    
    // PostHog:
    // posthog.capture(eventData.event, eventData.properties);
  }

  // Page view tracking
  trackPageView(path: string, title?: string) {
    this.track('page_view', {
      path,
      title: title || document.title,
      referrer: document.referrer,
    });
  }

  // User events
  trackUserSignup(method: string) {
    this.track('user_signup', { method });
  }

  trackUserLogin(method: string) {
    this.track('user_login', { method });
  }

  trackUserLogout() {
    this.track('user_logout');
  }

  // Feature events
  trackGarageSaleCreated(itemCount: number, hasFeaturedItems: boolean) {
    this.track('garage_sale_created', {
      item_count: itemCount,
      has_featured_items: hasFeaturedItems,
    });
  }

  trackGarageSaleViewed(saleId: string) {
    this.track('garage_sale_viewed', { sale_id: saleId });
  }

  trackFeaturedItemAdded(itemName: string, estimatedValue: number) {
    this.track('featured_item_added', {
      item_name: itemName,
      estimated_value: estimatedValue,
    });
  }

  trackImageUploaded(fileSize: number, fileType: string) {
    this.track('image_uploaded', {
      file_size: fileSize,
      file_type: fileType,
    });
  }

  // Error tracking
  trackError(error: Error, context?: string) {
    this.track('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context,
    });
  }

  // UI events
  trackButtonClick(buttonName: string, location: string) {
    this.track('button_clicked', {
      button_name: buttonName,
      location,
    });
  }

  trackFormSubmitted(formName: string, success: boolean) {
    this.track('form_submitted', {
      form_name: formName,
      success,
    });
  }
}

// Singleton instance
export const analytics = new AnalyticsService();

// React hooks for analytics
export const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location.pathname]);

  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserSignup: analytics.trackUserSignup.bind(analytics),
    trackUserLogin: analytics.trackUserLogin.bind(analytics),
    trackUserLogout: analytics.trackUserLogout.bind(analytics),
    trackGarageSaleCreated: analytics.trackGarageSaleCreated.bind(analytics),
    trackGarageSaleViewed: analytics.trackGarageSaleViewed.bind(analytics),
    trackFeaturedItemAdded: analytics.trackFeaturedItemAdded.bind(analytics),
    trackImageUploaded: analytics.trackImageUploaded.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackFormSubmitted: analytics.trackFormSubmitted.bind(analytics),
  };
};

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(name: string): void {
    this.metrics.set(name, performance.now());
  }

  endTiming(name: string): number {
    const startTime = this.metrics.get(name);
    if (!startTime) {
      console.warn(`No start time found for ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(name);
    
    // Log slow operations
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(name);
    return fn().finally(() => {
      this.endTiming(name);
    });
  }

  measureSync<T>(name: string, fn: () => T): T {
    this.startTiming(name);
    const result = fn();
    this.endTiming(name);
    return result;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Error monitoring
export class ErrorMonitor {
  private static instance: ErrorMonitor;

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError(event.error, 'global_error');
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(new Error(event.reason), 'unhandled_promise_rejection');
    });
  }

  captureError(error: Error, context?: string) {
    console.error('Error captured:', error, context);
    
    // Track in analytics
    analytics.trackError(error, context);
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, Bugsnag, etc.
      // Sentry.captureException(error, { extra: { context } });
    }
  }
}

export const errorMonitor = ErrorMonitor.getInstance();
