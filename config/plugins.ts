import type { Core } from '@strapi/strapi';

type UploadProvider = 'local' | 'cloudinary' | 'gcs';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const uploadProvider = env('UPLOAD_PROVIDER', 'local') as UploadProvider;
  const gcsServiceAccountRaw = env('GCS_SERVICE_ACCOUNT');

  let gcsServiceAccount: Record<string, unknown> | undefined;
  if (gcsServiceAccountRaw) {
    try {
      gcsServiceAccount = JSON.parse(gcsServiceAccountRaw);
    } catch {
      throw new Error('GCS_SERVICE_ACCOUNT must be a valid JSON string.');
    }
  }

  const uploadConfig =
    uploadProvider === 'cloudinary'
      ? {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        }
      : uploadProvider === 'gcs'
        ? {
            provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
            providerOptions: {
              bucketName: env('GCS_BUCKET_NAME'),
              basePath: env('GCS_BASE_PATH', ''),
              baseUrl: env('GCS_BASE_URL'),
              publicFiles: env.bool('GCS_PUBLIC_FILES', true),
              uniform: env.bool('GCS_UNIFORM', false),
              ...(gcsServiceAccount ? { serviceAccount: gcsServiceAccount } : {}),
            },
          }
        : {};

  return {
    seo: {
      enabled: true,
    },
    oembed: {
      enabled: true,
    },
    publisher: {
      enabled: true,
      config: {
        actions: {
          syncFrequency: env('PUBLISHER_SYNC_FREQUENCY', '*/1 * * * *'),
        },
      },
    },
    'strapi-google-analytics-dashboard': {
      enabled: true,
    },
    'email-designer-5': {
      enabled: true,
      config: {
        appearance: {
          theme: env('EMAIL_DESIGNER_THEME', 'modern_light'),
        },
      },
    },
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.example.com'),
          port: env.int('SMTP_PORT', 587),
          secure: env.bool('SMTP_SECURE', false),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          ignoreTLS: env.bool('SMTP_IGNORE_TLS', false),
        },
        settings: {
          defaultFrom: env('SMTP_FROM', 'no-reply@kagwiria.org'),
          defaultReplyTo: env('SMTP_REPLY_TO', env('SMTP_FROM', 'no-reply@kagwiria.org')),
        },
      },
    },
    upload: {
      config: uploadConfig,
    },
  };
};

export default config;
