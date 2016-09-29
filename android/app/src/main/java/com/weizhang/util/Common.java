package com.weizhang.util;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

/**
 * Created by free on 9/29/16.
 */
public class Common {

    /**
     * Try to return the absolute file path from the given Uri
     * 根据这个Uri获得其在文件系统中的路径
     * @param context
     * @param uri
     * @return the file path or null
     */
    public static String getRealFilePath(final Context context, final Uri uri ) {
        if ( null == uri ) return null;
        final String scheme = uri.getScheme();
        String data = null;
        if ( scheme == null )
            data = uri.getPath();
        else if ( ContentResolver.SCHEME_FILE.equals( scheme ) ) {
            data = uri.getPath();
        } else if ( ContentResolver.SCHEME_CONTENT.equals( scheme ) ) {
            Cursor cursor = context.getContentResolver().query( uri, new String[] { MediaStore.Images.ImageColumns.DATA }, null, null, null );
            if ( null != cursor ) {
                if ( cursor.moveToFirst() ) {
                    int index = cursor.getColumnIndex( MediaStore.Images.ImageColumns.DATA );
                    if ( index > -1 ) {
                        data = cursor.getString( index );
                    }
                }
                cursor.close();
            }
        }
        return data;
    }

    public static String getFileNameFromPath(String path) {
        int start = path.lastIndexOf("/");
        int end = path.lastIndexOf(".");
        if (start != -1 && end != -1) {
            return path.substring(start + 1, end);
        } else {
            return null;
        }
    }

//    public static Uri getUriFromPath(final Context context, final String path) {
//        String type = Utils.ensureNotNull(intent.getType());
//        Log.d(TAG, "uri is " + uri);
//        if (uri.getScheme().equals("file") && (type.contains("image/"))) {
//            String path = uri.getEncodedPath();
//            Log.d(TAG, "path1 is " + path);
//            if (path != null) {
//                path = Uri.decode(path);
//                Log.d(TAG, "path2 is " + path);
//                ContentResolver cr = this.getContentResolver();
//                StringBuffer buff = new StringBuffer();
//                buff.append("(")
//                        .append(Images.ImageColumns.DATA)
//                        .append("=")
//                        .append("'" + path + "'")
//                        .append(")");
//                Cursor cur = cr.query(
//                        Images.Media.EXTERNAL_CONTENT_URI,
//                        new String[] { Images.ImageColumns._ID },
//                        buff.toString(), null, null);
//                int index = 0;
//                for (cur.moveToFirst(); !cur.isAfterLast(); cur
//                        .moveToNext()) {
//                    index = cur.getColumnIndex(Images.ImageColumns._ID);
//                    // set _id value
//                    index = cur.getInt(index);
//                }
//                if (index == 0) {
//                    //do nothing
//                } else {
//                    Uri uri_temp = Uri
//                            .parse("content://media/external/images/media/"
//                                    + index);
//                    Log.d(TAG, "uri_temp is " + uri_temp);
//                    if (uri_temp != null) {
//                        uri = uri_temp;
//                    }
//                }
//            }
//        }
//    }
}
