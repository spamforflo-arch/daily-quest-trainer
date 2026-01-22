import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export const setupDailyNotification = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Notifications only work on native platforms');
    return;
  }

  try {
    // Request permission
    const permission = await LocalNotifications.requestPermissions();
    
    if (permission.display !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }

    // Cancel any existing notifications first
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }

    // Schedule daily notification at 6:30 AM IST (01:00 UTC)
    // IST is UTC+5:30, so 6:30 AM IST = 1:00 AM UTC
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(1, 0, 0, 0); // 1:00 AM UTC = 6:30 AM IST

    // If the time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Quest',
          body: 'Time to train 💪',
          id: 1,
          schedule: {
            at: scheduledTime,
            repeats: true,
            every: 'day',
          },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null,
        },
      ],
    });

    console.log('Daily notification scheduled for 6:30 AM IST');
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
};

export const checkNotificationPermission = async () => {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  const permission = await LocalNotifications.checkPermissions();
  return permission.display === 'granted';
};
