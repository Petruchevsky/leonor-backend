import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text & Attribute.DefaultTo<'Blog Entry'>;
    image: Attribute.Media;
    post: Attribute.RichText &
      Attribute.DefaultTo<'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nulla nunc, posuere a metus in, varius malesuada enim. Aliquam in varius est, ac viverra tortor. Nam ut ultricies erat. Nullam magna justo, ullamcorper in tempor a, tristique fermentum leo. Vestibulum luctus nulla enim, vel hendrerit dolor dignissim in. Etiam in lorem sollicitudin, tempor leo ac, laoreet lectus. Sed a euismod ex. Nunc id leo nec dolor tincidunt bibendum. In lobortis malesuada sollicitudin. Fusce ut elit non erat mollis mollis consequat quis tellus.  Cras quis convallis nibh. Donec ante quam, porttitor id ultrices a, gravida quis libero. Morbi blandit tellus vel nunc imperdiet pharetra. Morbi placerat pretium nisl sed dignissim. Morbi ut lorem quis augue laoreet volutpat eget non est. Aenean sed eleifend diam, eget tincidunt justo. Sed at luctus erat. Mauris maximus augue vel quam ultricies posuere. Ut vel erat molestie, malesuada odio ut, volutpat ligula. Vestibulum sagittis ex quis lacus luctus, vitae vehicula neque bibendum.  Nullam ut massa non metus hendrerit volutpat. Duis eget dolor in purus ornare placerat. Praesent non porta velit, non pellentesque nisl. Morbi eleifend pulvinar congue. Praesent purus nisi, tincidunt sed imperdiet at, pulvinar sed augue. Mauris eu egestas odio, eget vehicula erat. Phasellus imperdiet sem dignissim quam elementum, eu ornare nunc aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam malesuada ipsum metus, vel accumsan magna condimentum vel. Aenean tempus, erat eu hendrerit gravida, urna urna suscipit odio, quis mollis tortor nunc ac lorem. Donec volutpat lorem et tellus volutpat, eget efficitur risus cursus. In ex erat, egestas euismod volutpat ac, fermentum vitae magna.  Duis ac auctor leo. Maecenas vitae risus nec lorem fermentum consectetur at et nibh. Nullam at diam varius ante fringilla ultrices. Aliquam tristique efficitur nisl sit amet dignissim. Proin in arcu hendrerit, porttitor erat id, placerat massa. Suspendisse ac neque nec ex efficitur auctor et vel odio. In tempus viverra nibh, ac cursus orci mollis non. Integer gravida sit amet nisl eleifend pulvinar. Ut euismod leo turpis, at viverra enim accumsan vitae. Nunc pretium molestie fermentum. Ut molestie pharetra ultrices. Integer malesuada, leo sit amet lacinia congue, sem dolor consequat diam, eget volutpat nulla risus in orci. Phasellus eu efficitur lacus, sit amet lacinia libero.  Sed feugiat mollis malesuada. Mauris lobortis neque vel velit efficitur efficitur. Vivamus id dolor eget neque feugiat viverra tristique vel sapien. Fusce cursus erat et orci tincidunt pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in est pharetra, pulvinar magna id, suscipit ligula. Morbi iaculis malesuada mollis. Ut lectus odio, condimentum eu ligula a, dapibus porttitor nisl. In suscipit id felis sed malesuada. Morbi ac commodo elit, vitae gravida lorem. Aenean dictum faucibus mauris, vel mollis nisl sollicitudin ac. Donec eget felis ut tortor facilisis hendrerit sit amet sed enim. Nunc id dictum lorem. Suspendisse odio felis, ultricies at mollis a, cursus eget tortor. Vivamus molestie quam non sagittis aliquet.'>;
    url: Attribute.UID<'api::blog.blog', 'title'>;
    titulo: Attribute.String & Attribute.DefaultTo<'Entrada de Blog'>;
    contenido: Attribute.RichText;
    urlES: Attribute.UID<'api::blog.blog', 'titulo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiConsultationConsultation extends Schema.SingleType {
  collectionName: 'consultations';
  info: {
    singularName: 'consultation';
    pluralName: 'consultations';
    displayName: 'Consultation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    consultation: Attribute.String & Attribute.DefaultTo<'consultation'>;
    consultationText: Attribute.RichText &
      Attribute.DefaultTo<'Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl\u00B4sica de la literatura del Latin, que data del a\u00F1o 45 antes de Cristo, haciendo que este adquiera mas de 2000 a\u00F1os de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontr\u00F3 una de las palabras m\u00E1s oscuras de la lengua del lat\u00EDn, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del lat\u00EDn, descubri\u00F3 la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el a\u00F1o 45 antes de Cristo. Este libro es un tratado de teor\u00EDa de \u00E9ticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la secci\u00F3n 1.10.32  El trozo de texto est\u00E1ndar de Lorem Ipsum usado desde el a\u00F1o 1500 es reproducido debajo para aquellos interesados. Las seccio'>;
    consultas: Attribute.String & Attribute.DefaultTo<'Dudas y Consultas'>;
    consultasTexto: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consultation.consultation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consultation.consultation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.RichText;
    pregunta: Attribute.String;
    respuesta: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFeeFee extends Schema.SingleType {
  collectionName: 'fees';
  info: {
    singularName: 'fee';
    pluralName: 'fees';
    displayName: 'Fees';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fees: Attribute.String & Attribute.DefaultTo<'Fees'>;
    feesText: Attribute.RichText &
      Attribute.DefaultTo<'These fees includes all homeopathic remedies and postage within UK.  If you are outside the UK, I will provide details to a homeopathic pharmacy where you can purchase remedies online.  \u200B  If you are unable to make your appointment, please give at least 48 hours notice otherwise a fee will be incurred.  \u200B  Payment for consultations is required at the time of booking your appointment. '>;
    newClients: Attribute.RichText &
      Attribute.DefaultTo<' Initial consultation - New clients only (up to 75 mins)'>;
    newClientsPrice: Attribute.Integer & Attribute.DefaultTo<105>;
    existingClients: Attribute.RichText &
      Attribute.DefaultTo<' Follow-up - existing clients only  (45 mins)'>;
    existingClientsPrice: Attribute.Integer & Attribute.DefaultTo<70>;
    cobros: Attribute.String;
    cobrosTexto: Attribute.RichText;
    clientesNuevos: Attribute.RichText;
    clientesNuevosPrecio: Attribute.Integer & Attribute.DefaultTo<105>;
    clientesExistentes: Attribute.RichText;
    clientesExistentesPrecio: Attribute.Integer & Attribute.DefaultTo<70>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::fee.fee', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::fee.fee', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiGalleryGallery extends Schema.SingleType {
  collectionName: 'galleries';
  info: {
    singularName: 'gallery';
    pluralName: 'galleries';
    displayName: 'Gallery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.DefaultTo<'Media Gallery'>;
    description: Attribute.RichText &
      Attribute.DefaultTo<'"In our Gallery, you can see the before and after of my patients who have opted for a healthy homeopathic treatment. It\'s important to emphasise that not everyone progresses the same over time; what\'s crucial is knowing that we can improve with a medicine that is not harsh on our body."'>;
    image: Attribute.Media;
    titulo: Attribute.String &
      Attribute.DefaultTo<'Galer\u00EDa de Im\u00E1genes'>;
    descripcion: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gallery.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::gallery.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes';
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'Home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    welcome: Attribute.String;
    welcomeText: Attribute.RichText &
      Attribute.DefaultTo<'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno est\u00E1ndar de las industrias desde el a\u00F1o 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido us\u00F3 una galer\u00EDa de textos y los mezcl\u00F3 de tal manera que logr\u00F3 hacer un libro de textos especimen. No s\u00F3lo sobrevivi\u00F3 500 a\u00F1os, sino que tambien ingres\u00F3 como texto de relleno en documentos electr\u00F3nicos, quedando esencialmente igual al original.'>;
    about: Attribute.String;
    aboutText: Attribute.RichText &
      Attribute.DefaultTo<'Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl\u00B4sica de la literatura del Latin, que data del a\u00F1o 45 antes de Cristo, haciendo que este adquiera mas de 2000 a\u00F1os de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontr\u00F3 una de las palabras m\u00E1s oscuras de la lengua del lat\u00EDn, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del lat\u00EDn, descubri\u00F3 la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el a\u00F1o 45 antes de Cristo. Este libro es un tratado de teor\u00EDa de \u00E9ticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la secci\u00F3n 1.10.32  El trozo de texto est\u00E1ndar de Lorem Ipsum usado desde el a\u00F1o 1500 es reproducido debajo para aquellos interesados. Las seccio'>;
    selfie: Attribute.Media;
    hhch: Attribute.String & Attribute.DefaultTo<'How Homeopathy Can Help'>;
    hhchText: Attribute.RichText &
      Attribute.DefaultTo<'Es un hecho establecido hace demasiado tiempo que un lector se distraer\u00E1 con el contenido del texto de un sitio mientras que mira su dise\u00F1o. El punto de usar Lorem Ipsum es que tiene una distribuci\u00F3n m\u00E1s o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aqu\u00ED, contenido aqu\u00ED". Estos textos hacen parecerlo un espa\u00F1ol que se puede leer.'>;
    logo: Attribute.Media;
    homePageImage: Attribute.Media;
    bienvenido: Attribute.String & Attribute.DefaultTo<'Bienvenido'>;
    bienvenidoTexto: Attribute.RichText;
    sobreMi: Attribute.String & Attribute.DefaultTo<'Sobre Mi'>;
    sobreMiTexto: Attribute.RichText;
    clhpa: Attribute.String &
      Attribute.DefaultTo<'Como la Homeopat\u00EDa puede ayudar?'>;
    clhpaTexto: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHomeopathyHomeopathy extends Schema.SingleType {
  collectionName: 'homeopathies';
  info: {
    singularName: 'homeopathy';
    pluralName: 'homeopathies';
    displayName: 'Homeopathy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media;
    whatIsHomeopathy: Attribute.String &
      Attribute.DefaultTo<'What is Homeopathy?'>;
    whatIsHomeopathyText: Attribute.RichText &
      Attribute.DefaultTo<' Homeopathy is a system of complementary medicine in which individuals are given a remedy derived from natural substances, there are no raw material substances in our remedies, they are diluted to the point of not being detectable.   \u200B  Homeopathy seeks to match the energy of the disturbance in the body to help relieve the symptoms, whereas the conventional medicinal approach is to suppress the fever back into the body, homeopathy works by stimulating the body\u2019s natural tendency to heal itself, it acts as a catalyst.  \u200B  Homeopathy adopts a \u201Clike treats like\u201D approach to natural well-being.  \u200B  As a homeopath I am not so concerned with disease labels, but rather how your body expresses the symptoms of an illness. Remedies are matched to you, on an individual basis, taking into account your physical, mental and emotional situation.  \u200B  Homeopathy is an energy medicine where there is no \u201Cone pill fits all\u201D ethos. '>;
    whenUseHomeopathy: Attribute.String &
      Attribute.DefaultTo<' When and how can I use Homeopathy?'>;
    whenUseHomeopathyText: Attribute.RichText &
      Attribute.DefaultTo<' Homeopathy can be used for acute and chronic conditions and is safe alongside conventional medicine.      There are also many different ways to practice and use homeopathy.     Acute prescribing can help for first aid use, whereas chronic conditions can benefit from an in-depth case taking and analysis to find a remedy that suits your individual needs at that time \u2013 this is called constitutional prescribing.'>;
    queEsLaHomeopatia: Attribute.String &
      Attribute.DefaultTo<'Qu\u00E9 es la Homeopat\u00EDa?'>;
    queEsLaHomeopatiaTexto: Attribute.RichText;
    cuandoPuedoUsarHomeopatia: Attribute.String &
      Attribute.DefaultTo<'Cuando puedo usar Homeopat\u00EDa?'>;
    cuandoPuedoUsarHomeopatiaTexto: Attribute.RichText &
      Attribute.DefaultTo<'La homeopat\u00EDa se puede utilizar para condiciones agudas y cr\u00F3nicas y es segura junto con la medicina convencional. Tambi\u00E9n existen muchas formas diferentes de practicar y usar la homeopat\u00EDa.  La prescripci\u00F3n aguda puede ayudar en el uso de primeros auxilios, mientras que las condiciones cr\u00F3nicas pueden beneficiarse de una toma de caso en profundidad y un an\u00E1lisis para encontrar un remedio que se adapte a tus necesidades individuales en ese momento; esto se llama prescripci\u00F3n constitucional.'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::homeopathy.homeopathy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::homeopathy.homeopathy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPrivacyPolicePrivacyPolice extends Schema.SingleType {
  collectionName: 'privacy_polices';
  info: {
    singularName: 'privacy-police';
    pluralName: 'privacy-polices';
    displayName: 'Privacy Police';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    privacyPolice: Attribute.String & Attribute.DefaultTo<'Privacy Police'>;
    privacyPoliceText: Attribute.RichText &
      Attribute.DefaultTo<'Your confidentiality and privacy are important to me.    Below is a complete account of how I use and store your personal information.  At the point of your initial contact with me I collect basic information:  Name Address Contact Email address Phone number Reason for you contacting me  At the first appointment I collect medical history, date of birth and information about your condition/illness that you have consulted me for. After each subsequent appointment I then add additional notes about remedies and further ailments that we have discussed, and any suggestions I have made to you.  All the information I hold on you is collected directly from you, or via the method you have used to contact me (Setmore online booking system, email or via social media message services)  Upon first contact with me, prior to your appointment, I will email or post you a consent form to sign, this gives your consent and allows me to hold your personal data for the sole purpose of your treatment.  I use your data to help me prescribe remedies and to refer to when you book an appointment.   I do not share any of your data with anyone.  I will correspond with you by telephone, email, online and by post.  By law I am obliged to store your client notes for 7 years after your last consultation, and for children 7 years after their 18th birthday. Once this time has elapsed then I will destroy the files and delete any data I hold about you.  All of my notes are paper files only and these can be accessed by you, upon request at any time. I will make them available to you within 10 days of your request.  All my files are held within a locked filing cabinet that only I have access to. Contact information for you is held in my email provider Google Mail.'>;
    polizaDePrivacidad: Attribute.String &
      Attribute.DefaultTo<'P\u00F3liza de Privacidad'>;
    polizaDePrivacidadTexto: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::privacy-police.privacy-police',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::privacy-police.privacy-police',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTcsTcs extends Schema.SingleType {
  collectionName: 'tcss';
  info: {
    singularName: 'tcs';
    pluralName: 'tcss';
    displayName: 'Terms & Conditions';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    tcs: Attribute.String & Attribute.DefaultTo<'Terms & Conditions'>;
    tcsText: Attribute.RichText &
      Attribute.DefaultTo<'All appointments booked online require payment at the time of booking, to confirm the appointment.     You can cancel an appointment and get a full refund up to 48 hours prior to your appointment. Failure to attend your appointment will incur the full fee. Please double check your confirmation email as this will tell you the appointment time in your local time.  \u200B  If you have an emergency and cannot attend, please do contact me and I will reschedule for you and no fee will be charged. If I have to cancel or reschedule your appointment you will not be charged.  If urgent, you can contact me between appointments via email if necessary. I will endeavour to respond to you within my working hours - 9am - 5pm on Monday, Tuesdays and Thursdays only.   Thank you,  Leonor B.'>;
    tcsES: Attribute.String &
      Attribute.DefaultTo<'T\u00E9rminos y Condiciones'>;
    tcsESTexto: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tcs.tcs', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tcs.tcs', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'Testimonial';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    testimonial: Attribute.RichText & Attribute.Required;
    nombre: Attribute.String;
    testimonio: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimonioTestimonio extends Schema.CollectionType {
  collectionName: 'testimonios';
  info: {
    singularName: 'testimonio';
    pluralName: 'testimonios';
    displayName: 'Testimonios';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    testimonio: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonio.testimonio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonio.testimonio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::blog.blog': ApiBlogBlog;
      'api::consultation.consultation': ApiConsultationConsultation;
      'api::faq.faq': ApiFaqFaq;
      'api::fee.fee': ApiFeeFee;
      'api::gallery.gallery': ApiGalleryGallery;
      'api::home.home': ApiHomeHome;
      'api::homeopathy.homeopathy': ApiHomeopathyHomeopathy;
      'api::privacy-police.privacy-police': ApiPrivacyPolicePrivacyPolice;
      'api::tcs.tcs': ApiTcsTcs;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::testimonio.testimonio': ApiTestimonioTestimonio;
    }
  }
}
