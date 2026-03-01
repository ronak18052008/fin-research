/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: platformfeatures
 * Interface for PlatformFeatures
 */
export interface PlatformFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType text */
  benefit?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isPremium?: boolean;
}
