<?php
declare(strict_types=1);

namespace OpcachePanel;

use Exception;
use OpcachePanel\Exception\ApiException;

class API
{
    private static $paramType = [
        'compileFile' => ['is_array', 'is_string'],
        'invalidate' => ['is_array', 'is_string'],
        'invalidateDir' => ['is_array', 'is_string'],
        'isScriptCached' => ['is_string']
    ];

    /**
     * @param array $postData
     * @return string
     * @throws ApiException
     */
    public static function Run(array $postData): string
    {
        $action = $postData['action'] ?? '';
        $result = true;
        self::checkAction($action);
        if (array_key_exists($action, self::$paramType)) {
            $param = self::checkParam($postData['param'] ?? '', self::$paramType[$action]);
            foreach ($param as $value) {
                try {
                    $result = Opcache::$action($value);
                } catch (Exception $e) {
                    throw new ApiException($e->getMessage(), 500);
                }
            }
        } else {
            $result = Opcache::$action();
        }
        $result = is_array($result) ? $result : ['result' => $result];
        return json_encode($result);
    }

    /**
     * 检查操作是否存在
     *
     * @param string $action
     * @throws ApiException
     */
    private static function checkAction(string $action)
    {
        if (empty($action)) {
            throw new ApiException('"action" key can not empty', 400);
        }
        if (!method_exists(Opcache::class, $action)) {
            throw new ApiException('"action" value error', 400);
        }
    }

    /**
     * 检查参数是否符合规则
     *
     * @param $param
     * @param array $paramType
     * @return array
     * @throws ApiException
     */
    private static function checkParam($param, array $paramType): array
    {
        if (empty($param)) {
            throw new ApiException('"param" key can not empty', 400);
        }
        $isType = true;
        foreach ($paramType as $value) {
            $isType = $value($param);
            if ($isType) {
                break;
            }
        }
        if (!$isType) {
            throw new ApiException('"param" value type error, only accept these types: ' . implode(', ', $paramType), 400);
        }
        // 删除数组中所有空成员
        return array_filter(is_array($param) ? $param : [$param]);
    }
}
