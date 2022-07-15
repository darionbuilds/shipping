export abstract class Urls {
  static readonly SC_API_URL: string = 'https://api.starcitizen-api.com';
  static readonly RSI_URL: string = 'https://robertsspaceindustries.com';
  static readonly SC_TOOLS_API_URL = 'https://starcitizen.tools';
}

export abstract class Versions {
  static readonly SC_API_VERSION: string = 'v1/live';
  static readonly SC_TOOLS_API_TAIL = '&action=edit';
  static readonly SC_TOOLS_API_VERSION = 'index.php?title=';
}
